import React, { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { makeStyles } from '@material-ui/core/styles'
import { Box, TextField, Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    marginLeft: 16,
    color: theme.palette.primary.main,
  },
}))

const SearchBar = () => {
  const classes = useStyles()
  const [text, setText] = useState('')
  const [debouncedText] = useDebounce(text, 1000)

  const handleSearchChange = (e) => {
    setText(e.target.value)
  }

  return (
    <Box className={classes.root}>
      <TextField
        variant="outlined"
        placeholder="Search user here"
        size="small"
        value={text}
        onChange={handleSearchChange}
      />
      <SearchIcon className={classes.searchIcon} />
      {/* TODO: Replace with dropdown of users */}
      {debouncedText && <Typography>Searching for: {debouncedText}</Typography>}
    </Box>
  )
}

export default SearchBar
