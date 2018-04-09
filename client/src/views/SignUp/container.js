import { connect } from 'react-redux'
import {signUpUser, handleSignOut} from '../../store/user/duck'
import SingupForm from './component'
const SignUp = connect(
  (state) => ({
    user: state.user.user,
    isSubmitting: state.user.isSubmitting,
    rxError: state.user.error,
    phase: state.user.phase 
  }),
  {
    signUpUser,
    handleSignOut
  }
)(SingupForm)
export default SignUp
