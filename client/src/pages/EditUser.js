import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const EditUser = ({ match }) => {
  console.log(match);
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    email:"",
    image: "",
    mentor: "",
    village:"",
    groupLeader:"",
    memberNumber:"",
    phone:"",
    address:"",
    birthDay:"",
    birthMonth:"",
    birthYear:"",
  });
  useEffect(() => {
    fetch(`http://localhost:5000/user/${match.params.id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleChange = (email,name,mentor,village,groupLeader,memberNumber,phone,address,birthDay,birthMonth,birthYear) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    const value1 = email === "image" ? e.target.files[0] : e.target.value;
    const value2 = mentor === "image" ? e.target.files[0] : e.target.value;
    const value3 = village === "image" ? e.target.files[0] : e.target.value;
    const value4 = groupLeader === "image" ? e.target.files[0] : e.target.value;
    const value5 = memberNumber === "image" ? e.target.files[0] : e.target.value;
    const value6 = phone === "image" ? e.target.files[0] : e.target.value;
    const value7 = address === "image" ? e.target.files[0] : e.target.value;
    const value8 = birthDay === "image" ? e.target.files[0] : e.target.value;
    const value9 = birthMonth === "image" ? e.target.files[0] : e.target.value;
    const value10 = birthYear === "image" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value ,[email]: value1 ,[mentor]:value2,[village]:value3,[groupLeader]:value4,[memberNumber]:value5,[phone]:value6,[address]:value7,[birthDay]:value8,[birthMonth]:value9,[birthYear]:value10});
  };

  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("image", data.image);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("mentor", data.mentor);
      formData.append("village", data.village);
      formData.append("groupLeader", data.groupLeader);
      formData.append("memberNumber", data.memberNumber);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      formData.append("birthDay", data.birthDay);
      formData.append("birthMonth", data.birthMonth);
      formData.append("birthYear", data.birthYear);

      const res = await fetch(`http://localhost:5000/user/${match.params.id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
           setData({ name: "", email:"", image: "",mentor:"",village:"",groupLeader:"",memberNumber:"",phone:"",address:"",birthDay:"",birthMonth:"",birthYear:"" });
        history.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <div className="mb-3">
        name
        <input
          className="form-control"
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange("name")}
        />
      </div>
      <div className="mb-3">
        email
        <input
          className="form-control"
          type="text"
          name="email"
          value={data.email}
          onChange={handleChange("email")}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          type="file"
          accept="image/*"
          name="image"
          onChange={handleChange("image")}
        />
      </div>



      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Enter mentor"
          type="text"
          name="mentor"
          value={data.mentor}
          onChange={handleChange("mentor")}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Enter village"
          type="text"
          name="village"
          value={data.village}
          onChange={handleChange("village")}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Enter groupLeader"
          type="text"
          name="groupLeader"
          value={data.groupLeader}
          onChange={handleChange("groupLeader")}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Enter memberNumber"
          type="text"
          name="memberNumber"
          value={data.memberNumber}
          onChange={handleChange("memberNumber")}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Enter phone"
          type="text"
          name="phone"
          value={data.phone}
          onChange={handleChange("phone")}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Enter address"
          type="text"
          name="address"
          value={data.address}
          onChange={handleChange("address")}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Enter birthDay"
          type="text"
          name="birthDay"
          value={data.birthDay}
          onChange={handleChange("birthDay")}
        />
      </div>
       <div className="mb-3">
        <input
          className="form-control"
          placeholder="Enter birthMonth"
          type="text"
          name="birthMonth"
          value={data.birthMonth}
          onChange={handleChange("birthMonth")}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Enter birthYear"
          type="text"
          name="birthYear"
          value={data.birthYear}
          onChange={handleChange("birthYear")}
        />
      </div>
      




      <div className="text-center">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Update
        </button>
      </div>
    </div>
  );
};

export default EditUser;
