import React, { useRef, useState, useEffect } from 'react'

import { Form, Dropdown, ProgressBar, Button, Image } from 'react-bootstrap'
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { storage } from '../../firebase/config'

import { file, url } from '../../constants/_optionPostType'
// import AddPicsForm from './AddPicsForm'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../sass/_custom.scss'
import styles from './AddPics.module.scss'

function AddPics(props) {
  const [optionPost, setOptionPost] = useState()
  const [preview, setPreview] = useState()
  const [image, setImage] = useState()
  const [urlImage, setURLImage] = useState()
  const [progress, setProgress] = useState()

  useEffect(() => {
    return () => {
      preview && URL.revokeObjectURL(preview)
    }
  }, [preview])

  const titleInputRef = useRef()
  const addressInputRef = useRef()
  const descInputRef = useRef()

  const previewHandler = e => {
    if (e.target.files && !props.isEdit) {
      const previewImageFile = URL.createObjectURL(e.target.files[0])
      setPreview(previewImageFile) //Nếu dùng cho edit sẽ không có ảnh preview vì làm lỗi giao diện
    }
    if (!e.target.files && !props.isEdit) {
      const previewImageURL = e.target.value
      setPreview(previewImageURL)
    }
  }

  const imageFileHandler = e => {
    setImage(e.target.files[0])
  }

  const uploadFileImageHandler = e => {
    e.preventDefault()

    const storageRef = ref(storage, `files/${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on(
      'state_changed',
      snapshot => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgress(prog)
      },
      err => console.log(err),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref) //Tạo link ảnh trên firebase Storage
        postPictureToDB(url)
      }
    )
  }

  const uploadURLImageHandler = e => {
    e.preventDefault()

    postPictureToDB(urlImage)
  }

  const postPictureToDB = imageURL => {
    const enteredTitle = titleInputRef.current.value
    const enteredAddress = addressInputRef.current.value
    const enteredDesc = descInputRef.current.value

    const pictureData = {
      title: enteredTitle,
      image: imageURL,
      address: enteredAddress,
      description: enteredDesc,
    }

    !props.isEdit && props.onAddPictures(pictureData)
    props.isEdit && props.editPictureHandler(pictureData)
  }

  return (
    <Form
      onSubmit={urlImage ? uploadURLImageHandler : uploadFileImageHandler}
      className={styles.form}
      onClick={e => {
        props.isEdit && props.onPropagation(e)
      }}
    >
      <Form.Group className="mb-3" controlId="form">
        <Form.Label className={styles.formLabel}>Picture Title</Form.Label>
        <Form.Control
          type="text"
          className={styles.formControl}
          ref={titleInputRef}
          placeholder="Enter title..."
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="form">
        <Form.Label className={styles.formLabel}>Picture Source</Form.Label>
        <Form.Control
          type="text"
          className={styles.formControl}
          ref={addressInputRef}
          placeholder="Enter address..."
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label className={styles.formLabel}>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          className={styles.formControl}
          ref={descInputRef}
          placeholder="Enter description..."
        />
      </Form.Group>

      {optionPost === url && (
        <Form.Group className="mb-3" controlId="form">
          <Form.Label className={styles.formLabel}>Picture (URL)</Form.Label>
          <Form.Control
            type="text"
            required
            className={styles.formControl}
            onChange={e => {
              setURLImage(e.target.value)
              previewHandler(e)
            }}
            placeholder="Enter URL..."
          />
        </Form.Group>
      )}

      {optionPost === file && (
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label className={styles.formLabel}>Picture (File)</Form.Label>
          <Form.Control
            required
            type="file"
            className={styles.formControl}
            onChange={e => {
              imageFileHandler(e)
              previewHandler(e)
            }}
          />
        </Form.Group>
      )}

      <Dropdown className={styles.formDrop}>
        <Dropdown.Toggle variant="warning" id="dropdown-basic">
          Posting Options
        </Dropdown.Toggle>

        <Dropdown.Menu className={styles.formDropMenu}>
          <Dropdown.Item
            onClick={() => setOptionPost(url)}
            className={styles.formDropMenuItem}
          >
            URL
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setOptionPost(file)}
            className={styles.formDropMenuItem}
          >
            File
          </Dropdown.Item>
        </Dropdown.Menu>
        {preview && (
          <Image src={preview} alt="" className={styles.previewPic} />
        )}
      </Dropdown>

      {progress > 0 && (
        <ProgressBar now={progress} label={`${progress}%`} variant="warning" />
      )}

      <Form.Group className={styles.formBtn}>
        <Button variant="warning" type="submit">
          {!props.isEdit ? 'Add Picture' : 'Edit Picture'}
        </Button>
      </Form.Group>
    </Form>
  )
}

export default AddPics
