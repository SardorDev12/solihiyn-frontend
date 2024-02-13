import "../styles/howtouse.scss";
import view1 from "../Images/view 1.png";
import view2 from "../Images/view 2.png";
import view3 from "../Images/view 3.png";
import view4 from "../Images/view 4.png";
import view5 from "../Images/view 5.png";
import view6 from "../Images/view 6.png";

function HowToUse() {
  return (
    <section className="use">
      <h1 className="section-title">How to use</h1>
      <div className="use-cases">
        <div className="case">
          <h3 className="case-title">
            1. When you enter the system, you will see this window.
          </h3>
          <div className="case-img">
            <img src={view1} alt="view" />
          </div>
        </div>
        <div className="case">
          <h3 className="case-title">
            2. When you click the profile icon, profile menu will open where
            there is an add page link so that you can add your own zikrs to the
            system.
          </h3>
          <div className="case-img">
            <img src={view2} alt="view" />
          </div>
        </div>
        <div className="case">
          <h3 className="case-title">
            3. When you click add button, you can see this page.
          </h3>
          <div className="case-img">
            <img src={view3} alt="view" />
          </div>
        </div>
        <div className="case">
          <h3 className="case-title">
            4. Zikrs you add will show in main page like this.
          </h3>
          <div className="case-img">
            <img src={view4} alt="view" />
          </div>
        </div>
        <div className="case">
          <h3 className="case-title">
            5. On the header of each card, there are edit, reset and delete
            icons so that you can update, reset and delete items.
          </h3>
          <div className="case-img">
            <img src={view5} alt="view" />
          </div>
        </div>
        <div className="case">
          <h3 className="case-title">
            6. If you want to leave the system, you can click the logout button
            on the profile menu.
          </h3>
          <div className="case-img">
            <img src={view6} alt="view" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowToUse;
