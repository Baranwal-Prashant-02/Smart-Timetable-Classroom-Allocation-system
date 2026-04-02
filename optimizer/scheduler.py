import sys
import json
from ortools.sat.python import cp_model

try:
    data = json.loads(sys.stdin.read())

    batches = data["batches"]
    subjects = data["subjects"]
    classrooms = data["classrooms"]

    days = ["Monday","Tuesday","Wednesday","Thursday","Friday"]
    slots = [1,2,3,4,5]

    if len(subjects) == 0:
        print(json.dumps({"error": "No subjects found"}))
        exit()

    # ✅ FREE SLOT
    subjects.append({
        "_id": "FREE",
        "faculty_id": "FREE",
        "hours_per_week": 100
    })

    FREE_INDEX = len(subjects) - 1

    model = cp_model.CpModel()

    timetable = {}
    room_assignment = {}

    # ================= VARIABLES =================
    for b in range(len(batches)):
        for d in range(len(days)):
            for s in range(len(slots)):
                timetable[(b,d,s)] = model.NewIntVar(0, len(subjects)-1, f"t_{b}_{d}_{s}")
                room_assignment[(b,d,s)] = model.NewIntVar(0, len(classrooms)-1, f"room_{b}_{d}_{s}")

    # ================= SUBJECT HOURS (PRIORITY BASED) =================
    for b in range(len(batches)):
        for subj_index, subj in enumerate(subjects):

            if subj["_id"] == "FREE":
                continue

            required = subj.get("hours_per_week", 1)
            occ = []

            for d in range(len(days)):
                for s in range(len(slots)):
                    is_same = model.NewBoolVar(f"sub_{b}_{subj_index}_{d}_{s}")
                    model.Add(timetable[(b,d,s)] == subj_index).OnlyEnforceIf(is_same)
                    model.Add(timetable[(b,d,s)] != subj_index).OnlyEnforceIf(is_same.Not())
                    occ.append(is_same)

            # 🔥 LAB = STRICT
            if subj.get("type") == "lab":
                model.Add(sum(occ) == required)
            else:
                # THEORY = FLEXIBLE
                model.Add(sum(occ) <= required)

    # ================= BALANCE =================
    for subj_index, subj in enumerate(subjects):

        if subj["_id"] == "FREE":
            continue

        batch_usage = []

        for b in range(len(batches)):
            used = model.NewBoolVar(f"batch_use_{b}_{subj_index}")

            occ = []
            for d in range(len(days)):
                for s in range(len(slots)):
                    is_same = model.NewBoolVar(f"chk_{b}_{subj_index}_{d}_{s}")

                    model.Add(timetable[(b,d,s)] == subj_index).OnlyEnforceIf(is_same)
                    model.Add(timetable[(b,d,s)] != subj_index).OnlyEnforceIf(is_same.Not())

                    occ.append(is_same)

            model.AddMaxEquality(used, occ)
            batch_usage.append(used)

        model.Add(sum(batch_usage) >= 1)

    # ================= NO SAME SUBJECT IN SAME DAY =================
    for b in range(len(batches)):
        for d in range(len(days)):
            for subj_index, subj in enumerate(subjects):

                if subj["_id"] == "FREE":
                    continue

                occ = []

                for s in range(len(slots)):
                    is_same = model.NewBoolVar(f"day_{b}_{d}_{subj_index}_{s}")
                    model.Add(timetable[(b,d,s)] == subj_index).OnlyEnforceIf(is_same)
                    model.Add(timetable[(b,d,s)] != subj_index).OnlyEnforceIf(is_same.Not())
                    occ.append(is_same)

                model.Add(sum(occ) <= 1)

    # ================= LAB (SOFT PAIRING) =================
    lab_penalty = []

    for b in range(len(batches)):
        for d in range(len(days)):
            for subj_index, subj in enumerate(subjects):

                if subj["_id"] == "FREE":
                    continue

                if subj.get("type") != "lab":
                    continue

                for s in range(len(slots) - 1):

                    is_first = model.NewBoolVar(f"lab_{b}_{d}_{subj_index}_{s}")
                    is_second = model.NewBoolVar(f"lab_{b}_{d}_{subj_index}_{s+1}")

                    model.Add(timetable[(b,d,s)] == subj_index).OnlyEnforceIf(is_first)
                    model.Add(timetable[(b,d,s)] != subj_index).OnlyEnforceIf(is_first.Not())

                    model.Add(timetable[(b,d,s+1)] == subj_index).OnlyEnforceIf(is_second)
                    model.Add(timetable[(b,d,s+1)] != subj_index).OnlyEnforceIf(is_second.Not())

                    mismatch = model.NewBoolVar(f"lab_mismatch_{b}_{d}_{subj_index}_{s}")

                    model.Add(is_first != is_second).OnlyEnforceIf(mismatch)
                    model.Add(is_first == is_second).OnlyEnforceIf(mismatch.Not())

                    lab_penalty.append(mismatch)

    # ================= TEACHER CLASH =================
    for d in range(len(days)):
        for s in range(len(slots)):

            for faculty in set(str(sub["faculty_id"]) for sub in subjects if sub["_id"] != "FREE"):

                occ = []

                for b in range(len(batches)):
                    for subj_index, subj in enumerate(subjects):

                        if subj["_id"] == "FREE":
                            continue

                        if str(subj["faculty_id"]) == faculty:

                            is_same = model.NewBoolVar(f"teach_{b}_{d}_{s}_{subj_index}")
                            model.Add(timetable[(b,d,s)] == subj_index).OnlyEnforceIf(is_same)
                            model.Add(timetable[(b,d,s)] != subj_index).OnlyEnforceIf(is_same.Not())
                            occ.append(is_same)

                if occ:
                    model.Add(sum(occ) <= 1)

    # ================= CLASSROOM CLASH =================
    for d in range(len(days)):
        for s in range(len(slots)):
            for r in range(len(classrooms)):

                occ = []

                for b in range(len(batches)):
                    is_used = model.NewBoolVar(f"room_{b}_{d}_{s}_{r}")

                    model.Add(room_assignment[(b,d,s)] == r).OnlyEnforceIf(is_used)
                    model.Add(room_assignment[(b,d,s)] != r).OnlyEnforceIf(is_used.Not())

                    occ.append(is_used)

                model.Add(sum(occ) <= 1)

    # ================= CLASSROOM CAPACITY =================

    for b in range(len(batches)):
        batch_strength = batches[b].get("strength", 0)

        for d in range(len(days)):
            for s in range(len(slots)):
                for r in range(len(classrooms)):

                    room_capacity = classrooms[r].get("capacity", 0)

                    if room_capacity < batch_strength:
                        model.Add(room_assignment[(b,d,s)] != r)


    # ================= ROOM TYPE MATCHING =================

    for b in range(len(batches)):
        for d in range(len(days)):
            for s in range(len(slots)):
                for r in range(len(classrooms)):

                    room_type = classrooms[r].get("type", "theory")

                    for subj_index, subj in enumerate(subjects):

                        if subj["_id"] == "FREE":
                            continue

                        is_subj = model.NewBoolVar(f"type_{b}_{d}_{s}_{subj_index}_{r}")

                        model.Add(timetable[(b,d,s)] == subj_index).OnlyEnforceIf(is_subj)
                        model.Add(timetable[(b,d,s)] != subj_index).OnlyEnforceIf(is_subj.Not())

                        # ❌ LAB subject cannot go in theory room
                        if subj.get("type") == "lab" and room_type != "lab":
                            model.Add(room_assignment[(b,d,s)] != r).OnlyEnforceIf(is_subj)

                        # ❌ THEORY subject should not go in lab room
                        if subj.get("type") == "theory" and room_type == "lab":
                            model.Add(room_assignment[(b,d,s)] != r).OnlyEnforceIf(is_subj)


    # ================= OBJECTIVE =================
    free_penalty = []

    for b in range(len(batches)):
        for d in range(len(days)):
            for s in range(len(slots)):
                is_free = model.NewBoolVar(f"free_{b}_{d}_{s}")

                model.Add(timetable[(b,d,s)] == FREE_INDEX).OnlyEnforceIf(is_free)
                model.Add(timetable[(b,d,s)] != FREE_INDEX).OnlyEnforceIf(is_free.Not())

                free_penalty.append(is_free)

    # 🔥 LAB PRIORITY HIGHER
    model.Minimize(sum(free_penalty) * 3 + sum(lab_penalty) * 100)

    # ================= SOLVE =================
    solver = cp_model.CpSolver()
    solver.parameters.max_time_in_seconds = 5

    status = solver.Solve(model)

    if status != cp_model.OPTIMAL and status != cp_model.FEASIBLE:
        print(json.dumps({"error": "No feasible timetable found"}))
        exit()

    result = []

    for b in range(len(batches)):
        for d in range(len(days)):
            for s in range(len(slots)):

                idx = solver.Value(timetable[(b,d,s)])

                if idx < 0 or idx >= len(subjects):
                    idx = FREE_INDEX

                subj = subjects[idx]
                room_index = solver.Value(room_assignment[(b,d,s)])

                result.append({
                    "batch_id": str(batches[b]["_id"]),
                    "section": batches[b].get("section"),
                    "subject_id": str(subj["_id"]),
                    "faculty_id": str(subj["faculty_id"]),
                    "classroom_id": str(classrooms[room_index]["_id"]),
                    "day": days[d],
                    "slot": slots[s]
                })

    print(json.dumps(result))

except Exception as e:
    print(json.dumps({"error": str(e)}))