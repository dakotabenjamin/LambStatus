import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { getComponentColor } from 'utils/status'
import classes from './Components.scss'

export default class Components extends React.Component {
  static propTypes = {
    components: PropTypes.arrayOf(PropTypes.shape({
      componentID: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    }).isRequired).isRequired,
    classNames: PropTypes.string,
    fetchComponents: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.fetchComponents()
  }

  render () {
    const components = this.props.components.map(component => {
      let statusColor = getComponentColor(component.status)
      return (
        <li key={component.componentID} className={classnames('mdl-shadow--2dp', classes.item)}>
          <span className={classes['item-primary']}>
            <span><a href={component.url}>{component.name}</a></span>
            <span className={classes['item-subtitle']}>{component.description}</span>
          </span>
          <span className={classes['item-secondary']} style={{color: statusColor}}>
            {component.status}
          </span>
        </li>
      )
    })

    return (
      <div className={classes.container}>
        <ul>
          {components}
        </ul>
      </div>
    )
  }
}
