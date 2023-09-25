import style from "../../style/Review.module.css";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Review() {
  const [number, setNumber] = useState(0);
  const [hoverStar, setHoverStar] = useState(undefined);
  const navigate = useNavigate();

  const handleText = () => {
    switch (number) {
      case 0:
        return "Evaluate";
      case 1:
        return "Dissatifation";
      case 2:
        return "Unsatisfied";
      case 3:
        return "Normal";
      case 4:
        return "Satisfied";
      case 5:
        return "Very Satisfied";
      default:
        return "Evaluate";
    }
  };

  const handlePlaceHolder = () => {
    switch (number || hoverStar) {
      case 0:
        return "Comment here...";
      case 1:
        return "Sorry for the bad experience";
      case 2:
        return "What is your problem ? ";
      case 3:
        return "Anything to make us more better ?";
      case 4:
        return "Thank you for choosing us";
      case 5:
        return "Why do you like this event";
      default:
        return "Comment Here...";
    }
  };
  return (
    <div className={style.Review}>
      <div className={style.popup}>
        <div className={style.content}>
          <div className={style.product}>
            <h1>Rate us below !</h1>
          </div>
          <div>
            <p>
              {handleText()}, {handlePlaceHolder()}
            </p>
          </div>
          <div className={style.star}>
            {Array(5)
              .fill()
              .map((_, index) =>
                number >= index + 1 || hoverStar >= index + 1 ? (
                  <AiFillStar
                    key={index}
                    onMouseOver={() => setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{ color: "orange" }}
                    onClick={() => setNumber(index + 1)}
                  />
                ) : (
                  <AiOutlineStar
                    key={index}
                    onMouseOver={() => setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{ color: "orange" }}
                    onClick={() => setNumber(index + 1)}
                  />
                )
              )}
          </div>
          <textarea className={style.place} placeholder="comment here..." />
          <div>
            <button
              className={style.button}
              onClick={() => {
                navigate("/order-list");
                alert("Thank you, see ya !");
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
