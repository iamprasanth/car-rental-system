import Header from '../header/Header';

const InnerPageLayout = (props) => {
    return (
        <>
            <Header />
            <div className="main__body">
                {/* <div className="sidebar"></div> */}
                {props.children}
            </div>
        </>
    )
};

export default InnerPageLayout;
