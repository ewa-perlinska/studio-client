import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudioForm from "./StudioForm";
import { connect } from "react-redux";
import { createStudio } from "../../actions/studios";
import UploadImages from "../ImageUpload/ImageUploadContainer";

function CreateStudioContainer() {
  const dispatch = useDispatch();
  const [studioData, setStudioData] = useState({
    studioName: "",
    street: "",
    city: "",
    country: "",
    email: "",
    number: "",
    descriptionOfStudio: "",
    descriptionOfCaseStudies: "",
    descriptionOfPractie: "",
    descriptionOfDesignEducation: "",
    featuredImage: ""
  });

  const [loading, setLoading] = useState(false);
  const state = useSelector(reduxState => {
    return {
      studioState: reduxState.studio
    };
  });

  const handleSubmit = event => {
    console.log("---looking for roomId THROUGHT STATE---", state);

    event.preventDefault();
    // console.log(state);
    // const studioDetails = this.state;
    dispatch(createStudio(studioData));
  };

  const handleFileSelect = async e => {
    setLoading(true);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "qcq8titl");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/eperlinska/image/upload`,
      { method: "POST", body: data }
    );
    const file = await res.json();
    console.log(file.url);

    setStudioData(prevState => {
      return { ...prevState, featuredImage: file.url };
    });

    setLoading(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setStudioData(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const {
    studioName,
    street,
    city,
    country,
    email,
    number,
    descriptionOfStudio,
    descriptionOfCaseStudies,
    descriptionOfPractie,
    descriptionOfDesignEducation
  } = studioData;

  console.log("DATA", studioData);

  return (
    <div>
      <h1> ADD YOUR STUDIO </h1>
      <h3>~ ENTER INFORMATION ABOUT STUDIO BELOW ~</h3>
      <form onSubmit={handleSubmit}>
        <label>Studio Name :</label>
        <input onChange={handleChange} name='studioName' value={studioName} />
        <label>Street: </label>
        <input onChange={handleChange} name='street' value={street} />
        <label>City: </label>
        <input onChange={handleChange} name='city' value={city} />
        <label>Country: </label>
        <input onChange={handleChange} name='country' value={country} />
        <label>Email: </label>
        <input onChange={handleChange} name='email' value={email} />
        <label>Number: </label>
        <input
          onChange={handleChange}
          name='number'
          value={number}
          type='number'
        />
        <label>About studio: </label>
        <input
          onChange={handleChange}
          name='descriptionOfStudio'
          value={descriptionOfStudio}
        />

        <label>Case studies: </label>
        <input
          onChange={handleChange}
          name='descriptionOfCaseStudies'
          value={descriptionOfCaseStudies}
        />
        <label>Graphic design practice: </label>
        <input
          onChange={handleChange}
          name='descriptionOfPractie'
          value={descriptionOfPractie}
        />
        <label>Graphic design Education: </label>
        <input
          onChange={handleChange}
          name='descriptionOfDesignEducation'
          value={descriptionOfDesignEducation}
        />
        <label>Upload image: </label>
        <input type='file' onChange={handleFileSelect} name='featuredImage' />
        <input type='submit' disabled={loading} />
      </form>
    </div>
  );
}

// const mapStateToProps = state => {
//   console.log("STATE IN MSTP", state);
//   return {
//     event: state.events.selectedEvent
//   };
// };

export default connect()(CreateStudioContainer);

// export default connect(mapStateToProps)(CreateStudioContainer);
