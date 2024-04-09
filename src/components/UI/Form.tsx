const Form = ({onClose}) => {
  return (
    <section className="fixed inset-0 z-50 grid w-screen h-screen place-items-center bg-custom-blue/25">
      <div id="FORM_WRAPPER" className="w-[25%] xl:w-[35%] sm:w-[95%] p-5 bg-white shadow-nav">
        <div className="flex justify-between">
          <h1>FORM</h1>
          <span className="-mt-1 text-4xl leading-none duration-200 cursor-pointer hover:text-custom-blue" onClick={onClose}>
            &times;
          </span>
        </div>
      </div>
    </section>
  )
}

export default Form
