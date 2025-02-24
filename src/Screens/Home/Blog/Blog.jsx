// import React from 'react'
// import { useParams } from "react-router-dom"

// import BlogData from "https://playerstorage.b-cdn.net/quiztwiz/assets/BlogData"

// const Blog = () => {
//     const params = useParams()
//     console.log(params)

//     let id = Number(params.id)
//     let currentData = BlogData[id]

//     return (
//         <>
//             <div className='text-xl font-black'>
//                 {currentData.title}
//             </div>
//             <div className='flex flex-col gap-12'>

//                 <div className='flex flex-col gap-8 text-sm'>
//                     {
//                         currentData.para && currentData.para.length >= 1 && currentData.para.map((pa) => {
//                             return (
//                                 <>
//                                     <div className='flex flex-col gap-4'>
//                                         {
//                                             pa.heading && pa.heading.length >= 1 &&
//                                             <>
//                                                 <div className='text-base font-bold'>
//                                                     {pa.heading}
//                                                 </div>
//                                             </>
//                                         }
//                                         <div>
//                                             {pa.text}
//                                         </div>
//                                         {
//                                             pa.img &&
//                                             <>
//                                                 <img src={pa.img} alt="ERROR" />
//                                             </>
//                                         }
//                                     </div>
//                                 </>
//                             )
//                         })
//                     }
//                 </div>

//                 <div className='flex flex-col gap-8 text-sm pl-4'>
//                     {
//                         currentData.numbers && currentData.numbers.length >= 1 && currentData.numbers.map((num, index) => {
//                             return (
//                                 <>
//                                     <div className='flex flex-col gap-4'>
//                                         <div>
//                                             <span> {index + 1} </span> . <span> {num.text} </span>
//                                         </div>
//                                         {
//                                             num.img &&
//                                             <>
//                                                 <img src={num.img} alt="ERROR" />
//                                             </>
//                                         }
//                                     </div>
//                                 </>
//                             )
//                         })
//                     }
//                 </div>

//                 <ul className='flex flex-col gap-8 text-sm pl-4 '>
//                     {
//                         currentData.options && currentData.options.length >= 1 && currentData.options.map((op, index) => {
//                             return (
//                                 <>
//                                     <li className='list-disc'>
//                                         <div>
//                                             {op.text}
//                                         </div>
//                                         {
//                                             op.img &&
//                                             <>
//                                                 <img src={op.img} alt="ERROR" />
//                                             </>
//                                         }
//                                     </li>
//                                 </>
//                             )
//                         })
//                     }
//                 </ul>


//             </div>

//         </>
//     )
// }

// export default Blog
