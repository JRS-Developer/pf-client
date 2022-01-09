import axios from 'axios'
const { REACT_APP_CHAT } = process.env

export const getChatData = async ({
  materia_id,
  clase_id,
  school_id,
  ciclo_lectivo_id,
}) => {
  try {
    const url = `${REACT_APP_CHAT}/chat/clase`

    const data = {
      materia_id,
      clase_id,
      school_id,
      ciclo_lectivo_id,
    }

    return await axios.get(url, { params: data })
  } catch (error) {
    throw error
  }
}

export const getChatUsers = async ({
  materia_id,
  clase_id,
  school_id,
  ciclo_lectivo_id,
}) => {
  try {
    const url = `/chat/`

    return await axios.get(url, {
      params: { materia_id, clase_id, school_id, ciclo_lectivo_id },
    })
  } catch (error) {
    throw error
  }
}

export const getChatMessages = async (chat_id) => {
  try {
    const url = `${REACT_APP_CHAT}/messages/${chat_id}`

    return await axios.get(url)
  } catch (error) {
    throw error
  }
}

export const createChat = ({
  materia_id,
  clase_id,
  school_id,
  ciclo_lectivo_id,
}) => {
  try {
    const url = `${REACT_APP_CHAT}/chat/`

    const data = {
      clase: [materia_id, clase_id, school_id, ciclo_lectivo_id],
    }

    return axios.post(url, data)
  } catch (error) {
    throw error
  }
}

export const getOnlineUsers = (users, onlineUsers) => {
  let result = {}

  Object.keys(users).forEach((key) => {
    result[key] = users[key].map((user) => ({
      ...user,
      online: onlineUsers.includes(user.user.id),
    }))
  })

  return result
}
