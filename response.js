const response = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        statusCode,
        data,
        message,
        pagination : {
            prev: "",
            next: "",
            max: ""
        }
    })
}

// const response = (statusCode, data, message, res) => {
//     res.json(statusCode, [
//         {
//             data,
//             message,
//             meta: {
//                 prev: "",
//                 next: "",
//                 current: ""
//             }
//         }
//     ])
// }

module.exports = response