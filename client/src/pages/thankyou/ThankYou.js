import "./thankyou.css";

const ThankYou = () => {

    const queryParams = new URLSearchParams(window.location.search)
    const orderNumber = queryParams.get("order")

    return (
        <>
            <div className="container mt-100 thankyou">
                <div className="row  car-listings">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-6 col-sm-12 text-center main-div">
                        <h3>Thank you for your order, Your order number is :</h3>
                        <h3><b>{orderNumber}</b></h3>

                        <h3>You can use our chat bot if you want to retreive the order details</h3>
                    </div>
                </div>
            </div>

        </>
    )
};

export default ThankYou;
