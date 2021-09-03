import './index.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUserAction, usersSelector } from '../../store/users'

const AddUserPage = () => {
    const [userInfo, setUserInfo] = useState<any>({}),
        [stateRequest, setStateRequest] = useState<String>('def'),
        dispatch = useDispatch(),
        {users} = useSelector(usersSelector),
        onChange = ({ target: { id, value } }) => {
            if (id.includes('location')) {
                id = id.substring(9, 20).trim()
                setUserInfo({ ...userInfo, location: {...userInfo.location, [id]: value} })
            } else {
                setUserInfo({ ...userInfo, [id]: value })
            }
        }
    function onSubmit(event) {
        event.preventDefault();
        try {
            dispatch(addUserAction(userInfo))
            setStateRequest('good')
            return setTimeout(() => {
                setStateRequest('def')
            }, 2000)
        } catch {
            setStateRequest('err')
            return setTimeout(() => setStateRequest('def'), 2000)
           }
       }
    useEffect(() => {
        setUserInfo({
            ...userInfo,
            registered: new Date().toLocaleDateString(),
            id: +Date.now().toString() + users!.length
        })
       // eslint-disable-next-line
    }, [])
    return (
        <div className='p-5'>
            <form className="row g-3 needs-validation" onSubmit={onSubmit}>
                <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">First name</label>
                    <input type="text" className="form-control" id="firstName" {...{onChange}} required/>
                    <div className="valid-feedback"></div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="validationCustom02" className="form-label">Last name</label>
                    <input type="text" className="form-control" id="lastName" {...{onChange}} required/>
                    <div className="valid-feedback"></div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="validationCustomUsername" className="form-label">Location (Country)</label>
                    <input type="text" className="form-control" id="location-country" {...{onChange}}/>
                </div>
                <div className="col-md-3">
                    <label htmlFor="validationCustomUsername" className="form-label">Location (City)</label>
                    <input type="text" className="form-control" id="location-city" {...{onChange}}/>
                </div>
                <div className="col-md-3">
                    <label htmlFor="validationCustom03" className="form-label">Phone</label>
                    <input inputMode='tel' type="tel" className="form-control" id="phone" {...{onChange}}/>
                </div>
                <div className="col-md-3">
                    <label htmlFor="validationCustom03" className="form-label">E-Mail</label>
                    <input type="email" className="form-control" id="email" {...{onChange}}/>
                </div>
                <div className="col-md-3">
                    <label htmlFor="validationCustom05" className="form-label">Picture link</label>
                    <input type="text" className="form-control" id="icon" {...{onChange}}/>
                </div>
                <div className="col-12">
                    <button className={`btn btn-${stateRequest === 'good' ? 'success' : stateRequest === 'err' ? 'danger' :'primary'}`} onSubmit={onSubmit} type='submit'>Add User</button>
                </div>
            </form>
        </div>
    )
}
export {AddUserPage}