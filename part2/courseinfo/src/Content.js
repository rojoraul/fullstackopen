import Part from './Part'

const Content = (props) => {
    return (
      <div>
        
        {props.course.parts.map(item => {
            return <Part key={item.id} name={item.name} exercise={item.exercises} />
        })}
      </div>
    )}
export default Content;