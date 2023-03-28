import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import { fetchDocs, Doc } from "../features/docsSlice"
import { useAppDispatch, useAppSelector } from "../redux/redux"

const Table = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const docs: Doc[] = useAppSelector(state => state.docsReducer)



  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/")
    } else {
      const token = localStorage.getItem("token")?.slice(1, 28)
      dispatch(fetchDocs(token))

      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  console.log(docs)

  return (
    <div>
      {docs.map((doc) => {
        return (
          <h1 key={doc.id}>{doc.documentName}</h1>
        )
      })}
    </div>
  )
}
export default Table