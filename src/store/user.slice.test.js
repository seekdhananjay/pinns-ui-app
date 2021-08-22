const user_slice = require("./user.slice")
// @ponicode
describe("user_slice.login", () => {
    test("0", () => {
        let callFunction = () => {
            user_slice.login({ username: {}, password: ".Matrix53" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            user_slice.login({ username: {}, password: "!Lov3MyPianoPony" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            user_slice.login({ username: {}, password: "!ush3r" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            user_slice.login({ username: {}, password: "1Ki77y" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            user_slice.login({ username: {}, password: "$p3onyycat" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            user_slice.login({ username: undefined, password: undefined })
        }
    
        expect(callFunction).not.toThrow()
    })
})
