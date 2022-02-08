import React, {
  forwardRef,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react'

import { Card, Container, Row, Button } from 'react-bootstrap'
import { remove, ref, update } from 'firebase/database'
import { db } from '../../firebase/config'
import { ref as refFirebase, deleteObject } from 'firebase/storage'
import { storage } from '../../firebase/config'
import Zoom from 'react-medium-image-zoom'
import clsx from 'clsx'

import LoadingContext from '../../stores/getData-context'
import FavoriteContext from '../../stores/favorite-context'
import AuthContext from '../../stores/auth-context'
import { IMAGE_TYPE, VIDEO_TYPE } from '../../constants/_displayTypeName'
import {
  gif,
  jfif,
  jpeg,
  jpg,
  png,
  raw,
  tiff,
} from '../../constants/_imageType'
import AddPics from '../addPictures/AddPics'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-medium-image-zoom/dist/styles.css'
import styles from './Modal.module.scss'

function Modal(props, backDropRef) {
  const { pictureItem, isOpenModal, setPropagation, onCancel } = props

  const [isEdit, setIsEdit] = useState(false)
  const [displayType, setDisplayType] = useState(null)

  const { getData } = useContext(LoadingContext)
  const { removeFavorite } = useContext(FavoriteContext)
  const { isLoggedIn } = useContext(AuthContext)

  const videoRef = useRef()

  useEffect(() => {
    if (pictureItem.image.includes(jpeg)) {
      setDisplayType(IMAGE_TYPE)
    } else if (pictureItem.image.includes(jpg)) {
      setDisplayType(IMAGE_TYPE)
    } else if (pictureItem.image.includes(png)) {
      setDisplayType(IMAGE_TYPE)
    } else if (pictureItem.image.includes(jfif)) {
      setDisplayType(IMAGE_TYPE)
    } else if (pictureItem.image.includes(gif)) {
      setDisplayType(IMAGE_TYPE)
    } else if (pictureItem.image.includes(tiff)) {
      setDisplayType(IMAGE_TYPE)
    } else if (pictureItem.image.includes(raw)) {
      setDisplayType(IMAGE_TYPE)
    } else {
      setDisplayType(VIDEO_TYPE)
    }
  }, [pictureItem.image])

  useEffect(() => {
    if (isOpenModal && displayType === VIDEO_TYPE) {
      videoRef.current.play()
    }
  }, [isOpenModal, displayType])

  const deleteFirebaseStorageHandler = () => {
    const imageStorageRef = refFirebase(storage, pictureItem.image)
    deleteObject(imageStorageRef)
  }

  const deletePictureHandler = id => {
    if (window.confirm('Are you sure?')) {
      remove(ref(db, `pictures/${id}`))
      removeFavorite(pictureItem.id)
      setTimeout(() => {
        getData()
      }, 1000)
      onCancel()
      deleteFirebaseStorageHandler()
    }
  }

  const editPictureHandler = data => {
    update(ref(db, `pictures/${pictureItem.id}`), data)
    setTimeout(() => {
      getData()
    }, 1000)
    deleteFirebaseStorageHandler()
    onCancel()
  }

  const showEditHandler = () => {
    setIsEdit(prevState => !prevState)
  }

  let cardStyle = clsx(styles.card, {
    [styles.displayNone]: isEdit,
  })

  let content

  if (displayType === IMAGE_TYPE) {
    content = (
      <Zoom>
        <Card.Img
          variant="top"
          src={pictureItem.image}
          className={styles.cardImg}
        />
      </Zoom>
    )
  } else {
    content = (
      <video
        controls
        ref={videoRef}
        src={pictureItem.image}
        className={styles.cardImg}
      />
    )
  }

  return (
    <div className={styles.backDrop} ref={backDropRef} onClick={onCancel}>
      <Card
        style={{ width: '20rem' }}
        className={cardStyle}
        onClick={e => setPropagation(e)}
      >
        {content}

        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.cardTitle}>
            {pictureItem.title}
          </Card.Title>
          <Card.Text className={styles.cardAddress}>
            {pictureItem.address}
          </Card.Text>
          <Card.Text className={styles.cardDesc}>
            {pictureItem.description}
          </Card.Text>
          {isLoggedIn && (
            <>
              <Button
                variant="warning"
                className={styles.cardBtn}
                style={{ backgroundColor: '#c71c1c', color: '#fff' }}
                onClick={() => deletePictureHandler(pictureItem.id)}
              >
                Delete
              </Button>
              <Button
                variant="warning"
                className={styles.cardBtn}
                style={{ backgroundColor: '#1d1daf', color: '#fff' }}
                onClick={showEditHandler}
              >
                Edit
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
      {isEdit && (
        <Container style={{ margin: 0, width: '90vh' }}>
          <Row>
            <AddPics
              onPropagation={setPropagation}
              editPictureHandler={editPictureHandler}
              isEdit={isEdit}
            />
          </Row>
        </Container>
      )}
    </div>
  )
}

export default forwardRef(Modal)
