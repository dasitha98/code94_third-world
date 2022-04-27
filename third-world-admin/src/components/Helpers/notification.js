import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetState } from '../../actions/common';


export default function Notification(props) {
    const [show, setShow] = React.useState(true);
    const [message, setMessage] = React.useState('')

    const closeToast = () => {
        document.getElementById('liveToast').classList.remove('show')
        document.getElementById('liveToast').classList.add('hide')
        setMessage('')
    }

    const commonState = useSelector((state) => state.common)
    const dispatch = useDispatch()

    React.useEffect(() => {
        if(commonState.success){
            setMessage(commonState.notification.message)
            document.getElementById('liveToast').classList.remove('hide')
            document.getElementById('liveToast').classList.add('show')
            window.setTimeout(() => {
                document.getElementById('liveToast').classList.remove('show')
                document.getElementById('liveToast').classList.add('hide')
                setMessage('')
            }, 10000)
        }
        if(commonState.error){
            setMessage(commonState.notification.message)
            document.getElementById('liveToast').classList.remove('hide')
            document.getElementById('liveToast').classList.add('show')
            window.setTimeout(() => {
                document.getElementById('liveToast').classList.remove('show')
                document.getElementById('liveToast').classList.add('hide')
                setMessage('')
            }, 10000)
        }
    }, [commonState])

    return (
        <div class="position-fixed bottom-0 right-0 p-3" style={{ zIndex: 5, right: 0, bottom: 0, minWidth: 300 }}>
            <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
                <div class="toast-header">
                    <strong class="mr-auto">Note</strong>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" onClick={closeToast} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="toast-body">
                    {message}
                </div>
            </div>
        </div>
    );
}