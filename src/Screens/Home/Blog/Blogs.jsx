// import React from 'react'
// import { useHistory } from "react-router-dom"

// import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// import BlogData from "https://playerstorage.b-cdn.net/quiztwiz/assets/BlogData"

// const Blogs = () => {
//     const history = useHistory()

//     const goToBlog = (id) => {
//         history.push(`/home/blog/${id}`)
//     }

//     return (
//         <>
//             {
//                 BlogData.map((data, index) => {
//                     return (
//                         <>
//                             <div className='bg-white p-5 rounded-md text-black flex justify-between items-center cursor-pointer' onClick={() => goToBlog(index)}>
//                                 <span>  {data.title} </span>
//                                 <span> <ChevronRightIcon /> </span>
//                             </div>
//                         </>
//                     )
//                 })
//             }

//         </>
//     )
// }

// export default Blogs
