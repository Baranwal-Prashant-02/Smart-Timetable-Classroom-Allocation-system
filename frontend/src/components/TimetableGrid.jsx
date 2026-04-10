// import React from "react"

// const TimetableGrid = ({ data }) => {
//   const days = ["Monday","Tuesday","Wednesday","Thursday","Friday"]
//   const slots = [1,2,3,4,5]

//   return (
//     <table border="1">
//       <thead>
//         <tr>
//           <th>Day / Slot</th>
//           {slots.map(slot => <th key={slot}>Slot {slot}</th>)}
//         </tr>
//       </thead>

//       <tbody>
//         {days.map(day => (
//           <tr key={day}>
//             <td>{day}</td>

//             {slots.map(slot => {
//               const cell = data.find(
//                 d => d.day === day && d.slot === slot
//               )

//               return (
//                 <td key={slot}
//                   style={{
//                     backgroundColor: cell
//                       ? (cell.subject_id.type === "lab" ? "#cce5ff" : "#d4edda")
//                       : "#f0f0f0"
//                   }}
// >
//                   {cell ? (
//                     <>
//                       <div><b>{cell.subject_id.subject_name}</b></div>
//                       <small>{cell.classroom_id.room_no}</small>
//                     </>
//                   ) : "FREE"}
//                 </td>
//               )
//             })}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   )
// }

// export default TimetableGrid

import React from "react"

const days = ["Monday","Tuesday","Wednesday","Thursday","Friday"]
const slots = [1,2,3,4,5]

const TimetableGrid = ({ data }) => {

  return (
    <table className="w-full border border-gray-300 mt-4">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="p-2">Day / Slot</th>
          {slots.map(slot => (
            <th key={slot} className="p-2">Slot {slot}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {days.map(day => (
          <tr key={day} className="text-center">
            <td className="font-bold border p-2">{day}</td>

            {slots.map(slot => {
              const cell = data.find(
                d => d.day === day && d.slot === slot
              )

              return (
                <td
                  key={slot}
                  className={`border p-2
                    ${!cell ? "bg-gray-100"
                      : cell.subject_id.type === "lab"
                      ? "bg-blue-200"
                      : "bg-green-200"}
                  `}
                >
                  {cell ? (
                    <>
                      <div className="font-semibold">
                        {cell.subject_id.subject_name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {cell.classroom_id.room_no}
                      </div>
                    </>
                  ) : "FREE"}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TimetableGrid