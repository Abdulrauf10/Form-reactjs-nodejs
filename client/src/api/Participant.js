import axios from 'axios'

export const postParticipantApi = async (params) => {

  try {
    const postParticipant = await axios.post('http://localhost:8000/post-participant', params)

    return postParticipant
  } catch (error) {
    console.log(error)
  }
}

export const getAllParticipantApi = async () => {
  try {
    const getParticipants = await axios.get('http://localhost:8000/get-participants')

    return getParticipants.data
  } catch (error) {
    console.log(error)
  }
}

export const deleteParticipant = async (id) => {
  console.log(id)
  try {
    const deleteById = await axios.delete(`http://localhost:8000/delete-participant/${id}`)

    return deleteById.data
  } catch (error) {
    console.log(error)
  }
}
