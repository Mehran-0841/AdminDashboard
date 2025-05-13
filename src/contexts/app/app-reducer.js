
// این ریدوسر برای مدیریت زبان اپلیکیشن استفاده می شود
const appReducer = (state, action) => {
    // اینجا اکشن ها را بررسی میکنیم
    // و بر اساس نوع اکشن، وضعیت را تغییر میدهیم
    switch(action.type) {
        // اینجا اکشن تغییر زبان را بررسی میکنیم
        // و زبان را تغییر میدهیم
        case 'CHANGE_LANGUAGE': { 
            return {
                ...state,
                language: action.payload
            }

        }
        case 'CHANGE_THEME': {
            return {
                ...state,
                theme: action.payload
            }
        }
        case 'TOGGLE_SIDEBAR': {
            return {
                ...state, 
                showSidebar : !state.showSidebar
            }
        }

    }
}

export default appReducer;