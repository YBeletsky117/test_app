import './index.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserAction, usersSelector } from '../../store/users'
import { useEffect } from 'react'
import getNameAndLast from '../../utils/additionalFunctions/getNameAndLast'
import Loader from '../../components/Loader'
import { store } from '../../store'

const MainPage = () => {
  const [inputValue, setInputValue] = useState<String>(''),
    [usersList, setUsersList] = useState<USER_TYPES.Users['results']>(store.getState().users.users!),
    dispatch = useDispatch(),
      
    searchDebounce = debounce(function () {
      const searchRequest = getNameAndLast(inputValue)
      setUsersList(searchRequest.length !== 0 ? usersListFromStore!.filter(({ firstName, lastName }) =>
          firstName.includes(searchRequest[0]) ||
          firstName.includes(searchRequest[1]) ||
          lastName.includes(searchRequest[0]) ||
          lastName.includes(searchRequest[1])
      ): usersListFromStore!)
    }, 600),

    onSearch = ({ target: { value } }) => {
      setInputValue(value)
    },

    onDelete = (val) => dispatch(deleteUserAction(+val.target.id)),

    onReset = () => setInputValue(''),

    headerTable = [
      '№',
      'First',
      'Last',
      'Picture',
      'Location',
      'e-mail',
      'Phone',
      'Registred Date',
      'Delete'
    ],
    { users: usersListFromStore, isLoaded } = useSelector(usersSelector)
  
  useEffect(() => {
    setUsersList(usersListFromStore!)
  }, [isLoaded])

  useEffect(() => {
    searchDebounce()
  }, [inputValue])


  function debounce (func: Function, delay: number) {
    let timer
    return () => {
        function funcApply (this: any) {
            func.apply(this, arguments)
        }
        clearTimeout(timer)
        timer = setTimeout(funcApply, delay)
    }
}
    return (
        <div className='container' >
              <div className="d-flex p-4">
                  <input
                    className="form-control me-3"
                    id="search"
                    type="search"
                    aria-label="Search"
                    onChange={onSearch}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="reset"
                    onClick={onReset}
                  >
                    Reset
                  </button>
        </div>
        <div className='content' >
          {isLoaded ? usersList!.length === 0 ? <h5 className='text-center pt-4' >No data available</h5> :
            <table className="table table-striped">
          <thead>
            <tr>
              {headerTable.map((label, index) => <th scope="col" key={index} >{label}</th>)}
            </tr>
          </thead>
          <tbody>
            {usersList!.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index++}</th>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                  <img
                    className='user-icon'
                    src={user.icon}
                    alt={`Icon by ${user.firstName} ${user.lastName}`}
                  />
                </td>
                <td>{`${user.location.country}, ${user.location.city}`}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.registered}</td>
                <td>
                  <button
                    id={user.id.toString()}
                    onClick={onDelete}
                    type="button"
                    className="btn btn-outline-danger">&#65794;</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> : <div className='center'><Loader/></div>}
          
        </div>
                
          
        </div>
    )
}
export {MainPage}