const response = (statusCode, payload, message, res) => {
    res.status(statusCode).json({
        statusCode,
        payload,
        message
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