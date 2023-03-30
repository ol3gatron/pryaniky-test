import spinner from "../assets/spinner.gif"

const Spinner = () => {
  return (
    <div style={{
      height: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <img src={spinner} alt="Загрузка..." />
    </div>
  )
}
export default Spinner