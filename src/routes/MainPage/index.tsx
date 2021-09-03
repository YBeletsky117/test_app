import './index.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserAction, usersSelector } from '../../store/users'
import { useEffect } from 'react'
import Loader from '../../components/Loader'
import { store } from '../../store'
import { debounce, getNameAndLast } from '../../utils/additionalFunctions'

const MainPage = () => {
  const dispatch = useDispatch(),
    [usersList, setUsersList] = useState<USER_TYPES.Users['results']>(store.getState().users.users!),
      
    onSearchDebounce = debounce(function ({ target: { value } }) {
      const searchRequest = getNameAndLast(value, 2)
      setUsersList(value.length !== 0 ? usersListFromStore!.filter(({ firstName, lastName }) =>
          firstName.includes(searchRequest[0]) ||
          firstName.includes(searchRequest[1]) ||
          lastName.includes(searchRequest[0]) ||
          lastName.includes(searchRequest[1])
      ): usersListFromStore!)
    }, 1000),

    onDelete = (val) => dispatch(deleteUserAction(+val.target.id)),

    onReset = () => {
      (document.getElementById('search') as HTMLInputElement).value = ''
      setUsersList(usersListFromStore!)
    },

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
  }, [usersListFromStore])

    return (
        <div className='container' >
              <div className="d-flex p-4">
                  <input
                    className="form-control me-3"
            id="search"
            itemID='search'
                    type="search"
                    aria-label="Search"
                    onChange={onSearchDebounce}
                  />
                  <button
                    className="btn btn-outline-secondary"
            type="reset"
            onClick = {onReset}
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
                        {user.icon ? <img
                        className='user-icon'
                        src={user?.icon}
                        alt={`Icon by ${user.firstName} ${user.lastName}`}
                      /> : <p>No icon</p>}
                      
                      </td><td>
                        {user.location ?
                          <p>{user.location.country ?? null}
                            {user.location.city && user.location.country && `, `}
                          {user.location.city ?? null }</p>
                          : null}
                    </td>
                    <td>{user?.email}</td>
                    <td>{user?.phone}</td>
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