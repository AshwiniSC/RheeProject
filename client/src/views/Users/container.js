import { connect } from 'react-redux'

import { handleSignOut, fetchAdminUser, createAdminUser, getUserData,deleteUser,updateUser, clearPhase} from '../../store/user/duck'

import Users from './component'

const UsersContainer = connect(
  // Map state to props

  (state) => ({
    users: state.user.users,
    success: state.user.success,
    adminPhase: state.user.adminPhase,
    message: state.user.message,
    fetchPhase: state.user.fetchPhase,
    userdata: state.user.userdata,
    dataPhase: state.user.dataPhase,
    deletePhase: state.user.deletePhase,
   }), {
    handleSignOut,
    fetchAdminUser,
    createAdminUser,
    getUserData,
    deleteUser,
    updateUser,
    clearPhase
  }
)(Users)

export default UsersContainer
