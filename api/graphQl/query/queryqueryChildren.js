import { gql } from 'react-apollo'


const queryqueryChildren = gql`queryChildren{
  children(teacher_id: "67982f14-2951-4533-a61b-c047b5e8d2d2") {
    id
    name
    gender
    avatar
   }
}`

export default queryqueryChildren
