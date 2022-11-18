import { useState , useEffect}from 'react';
import profile from '../assests/profileIcon.svg'
import getPhotoUrl from 'get-photo-url';
import { db } from '../dexie';

const Bio = () => {
  const [userDetails, setUserDetails] = useState({
    name: 'Oyindamola Dorcas',
    about: 'Building Newdev.io - Learn to code and connect with the best minds.'
  })
  const[editFormIsOpen, setEditFormIsOpen] = useState(false)
  const [profilePhoto , setProfilePhoto] = useState(profile)

  useEffect(() => {
      const setDataFromDb = async () =>{
      const userDetailsFromDb = await db.bio.get('info')
      const profilePhotoFromDb = await db.bio.get('profilePhoto')
      userDetailsFromDb && setUserDetails(userDetailsFromDb)
      profilePhotoFromDb && setProfilePhoto(profilePhotoFromDb)
    }

    setDataFromDb()
  }, []);

  const updateUserDetails = async(event) => {
   event.preventDefault()
   const objectData = {
    name : event.target.nameOfUser.value,
    about : event.target.aboutUser.value,
   }
   setUserDetails(objectData)
    await db.bio.put(objectData, 'info')
   setEditFormIsOpen(false)
  }


    const editForm = (
        <form className='edit-bio-form' onSubmit={(e) => updateUserDetails(e)}>
          <input type="text" id='' name='nameOfUser' defaultValue={userDetails?.name} placeholder='Your name' />
          <input type="text" id='' name='aboutUser' defaultValue={userDetails?.abou} placeholder='About you' />
          <br />
          <button type='button' className='cancel-button' onClick={()  => setEditFormIsOpen(false)}>Cancel</button>
          <button type='submit' className='save-button'>Save</button>

        </form>
    )
    const updateProfilePhoto = async() =>{
      const newProfilePhoto = await getPhotoUrl('#profilePhotoInput')
    setProfilePhoto(newProfilePhoto)
    await db.bio.put(newProfilePhoto, 'profilePhoto')
  }
    const editButton = <button onClick={() => setEditFormIsOpen(true)}>Edit</button>
   
  return (
  <section className='bio'>
    <input type="file" accept='image/*' name='photo' id="profilePhotoInput" />
    <label htmlFor="profilePhotoInput" onClick={updateProfilePhoto}>
    <div className='profile-photo' role='button' title='click to edit photo'>
        <img src={profilePhoto} alt="profile" />
    </div>
    </label>
    <div className='profile-info'>
        <p className='name'>{userDetails.name}</p>
        <p className="about">{ userDetails.about}</p>
        { editFormIsOpen ? editForm : editButton }
    </div>
  </section>
  );
}

export default Bio;
