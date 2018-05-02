const registrationReducer = (state = {
  email: "",
  password: "",
  hospital: ""
}, action) => {
  switch (action.type) {
    case 'REGISTRATION_DATA': return {
      ...state,
      email: action.payload.email,
      password: action.payload.password,
      hospital: action.payload.hospital
    }
    default: return state
  }
}

export default registrationReducer;