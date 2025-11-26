interface IProps {
    list: string[];
}

export const CoursesList = (props: IProps) => {
  return (
    <ul className="courses-list">
        {
            props.list.map((item, index) => <li key={index + item}>{item}</li>)
        }
    </ul>
  )
}
