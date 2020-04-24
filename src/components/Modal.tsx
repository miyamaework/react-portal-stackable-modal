import React, { useContext, useRef, useState, useEffect } from 'react'

import { createPortal } from 'react-dom'

import { StateType, StateContext, DispatchContext } from '../modules/modules'
import ModalContent from './ModalContent'

const Modal: React.FC = () => {
  const ref = useRef()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector('#__next')
    setMounted(true)
  }, [])

  const dispatch = useContext(DispatchContext)
  const state = useContext<StateType>(StateContext)

  return mounted
    ? createPortal(
        <div className="modal">
          <button onClick={(): void => dispatch({ type: 'shift' })}>
            close
          </button>
          {state.modals?.[0] && <ModalContent type={state.modals[0]} />}
          <style jsx>{`
            .modal {
              position: fixed;
              top: 50vh;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.5);
            }
          `}</style>
        </div>,
        ref.current
      )
    : null
}

export default Modal
