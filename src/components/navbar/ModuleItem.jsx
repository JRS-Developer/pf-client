import { useState } from 'react'
import {
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Collapse,
  Icon,
} from '@mui/material/'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'

const ModuleItem = ({ getActionsModule, module }) => {
  const [open, setOpen] = useState(true)

  return (
    <>
      <ListItemButton
        component="li"
        divider
        onClick={() => setOpen((open) => !open)}
      >
        <ListItemText primary={module.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          {module.sub_data?.map((subModule) => (
            <ListItemButton
              key={subModule.id}
              onClick={() => {
                getActionsModule(subModule.id)
              }}
              component={NavLink}
              to={subModule.url}
              activeClassName="Mui-selected"
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <Icon xs={{ color: 'text.primary' }}>{subModule.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={subModule.name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  )
}

export default ModuleItem
