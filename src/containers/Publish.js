import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
const Publish = ({ tokenUser }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  //   const [errors, setErrors] = useState("");
  //history
  const history = useHistory();

  //   console.log("token ", tokenUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("picture", picture);

    try {
      const response = await axios.post(
        "https://vinted-back-project.herokuapp.com/offer/publish",
        // "http://localhost:3200/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${tokenUser}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        setTitle("");
        setDescription("");
        setPrice("");
        setCondition("");
        setCity("");
        setBrand("");
        setSize("");
        setColor("");
        history.push("/");
        window.location.reload(false);
      }
    } catch (err) {
      //   if (err.response.status === 400) {
      //     setErrors("Remplissez tous les champs");
      //   } else {
      //     setErrors("Une erreur est survenue");
      //   }
      console.log(err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form publish_form">
        <Link to="/">Revenir sur la page d'Accueil ?</Link>
        <h2>Publier une annonce</h2>
        <input
          type="text"
          value={title}
          placeholder="Titre"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="select_file">
          <label htmlFor="file">Ajouter une image</label>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            placeholder="Annonce"
            onChange={(e) => setPicture(e.target.files[0])}
          />
          {picture && <img src={URL.createObjectURL(picture)} alt="file-img" />}
        </div>
        <textarea
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          value={price}
          placeholder="Prix"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          value={condition}
          placeholder="Condition"
          onChange={(e) => setCondition(e.target.value)}
        />
        <input
          type="text"
          value={city}
          placeholder="Emplacement"
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          value={brand}
          placeholder="Marque"
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="text"
          value={size}
          placeholder="Taille"
          onChange={(e) => setSize(e.target.value)}
        />
        <input
          type="text"
          value={color}
          placeholder="Couleur"
          onChange={(e) => setColor(e.target.value)}
        />
        {/* {errors && <p className="invalid-feedback">{errors}</p>} */}
        <input type="submit" value="Ajouter une annonce" />
      </form>
    </>
  );
};

export default Publish;
