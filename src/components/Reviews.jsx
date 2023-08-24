import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-stars";
import { reviewsRef, db } from "../firebase/firebase";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";


const Reviews = ({ id, prerating, userno }) => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const [rating, setRating] = useState(0);
  const [thought, setThought] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [newAdded, setNewAdded] = useState(0);
  useEffect(() => {
    async function getData() {
      setReviewsLoading(true);
      setData([]);
      let qur = query(reviewsRef, where("movieId", "==", id));
      const r_data = await getDocs(qur);
      r_data.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });

      setReviewsLoading(false);
    }
    getData();
  }, [newAdded]);

  const sendReviews = async () => {
    setLoading(true);
    try {
      if(useAppstate.login){
      await addDoc(reviewsRef, {
        movieId: id,
        name: useAppstate.uname,
        rating: rating,
        thought: thought,
        timestamp: new Date().getTime(),
      });
      const _doc_ref = doc(db, "movies", id);
      await updateDoc(_doc_ref, {
        rating: rating + prerating,
        rated: userno + 1,
      });

      swal({
        title: "Sucsessfully adeed",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
      
      setRating(0);
      setThought("");
      setNewAdded(newAdded+1);
    } else{
      navigate('/login');
    }
    } catch (err) {
      swal({
        title: err.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };

  return (
    <div className="mt-4 w-full border-t-2 py-3 ">
      <ReactStars
        size={30}
        half={true}
        onChange={(nw) => {
          setRating(nw);
        }}
        value={rating}
      />
      <input
        className="w-full p-2 outline-none bg-gray-800"
        type="text"
        placeholder="Enter Your Thought..."
        value={thought}
        onChange={(e) => setThought(e.target.value)}
      />
      <button
        onClick={sendReviews}
        className="bg-green-400 w-full p-1 font-extrabold mt-5 hover:bg-green-500 flex justify-center items-center"
      >
        {loading ? <TailSpin height={25} color="white" /> : "Submit"}
      </button>

      {reviewsLoading ? (
        <div className="mt-8 w-full flex justify-center items-center">
          {" "}
          <ThreeDots height={10} color="white" />
        </div>
      ) : (
        <div className="mt-5">
          {data.map((e, i) => {
            return (
              <div key={i} className="bg-gray-900 p-2 w-full mt-2 border-b border-gray-600">
                <div className="flex">
                  <p className="text-blue-500">{e.name}</p>
                  <p className="ml-3 text-xs">
                    ( {new Date(e.timestamp).toLocaleString()} )
                  </p>
                </div>
                <ReactStars
                  size={15}
                  half={true}
                  value={e.rating}
                  edit={false}
                />
                <p>{e.thought}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reviews;
