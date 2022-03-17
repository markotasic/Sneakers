import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions(props) {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <Accordion
        sx={{
          backgroundColor: 'transparent',
        }}
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          aria-controls={'panel1d-content'}
          id={'panel1d-header'}
        >
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {props.filter.Category.map((item) => (
            <FormGroup key={item}>
              <FormControlLabel
                control={<Checkbox onChange={props.filterCategoryItems} />}
                value={item}
                label={item}
              />
            </FormGroup>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          backgroundColor: 'transparent',
        }}
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary
          aria-controls={'panel2d-content'}
          id={'panel2d-header'}
        >
          <Typography>Brand</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {props.filter.Brand.map((item) => (
            <FormGroup key={item}>
              <FormControlLabel
                control={<Checkbox onChange={props.filterBrandItems} />}
                value={item}
                label={item}
              />
            </FormGroup>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          backgroundColor: 'transparent',
        }}
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary
          aria-controls={'panel3d-content'}
          id={'panel3d-header'}
        >
          <Typography>Type</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {props.filter.Type.map((item) => (
            <FormGroup key={item}>
              <FormControlLabel
                control={<Checkbox onChange={props.filterTypeItems} />}
                value={item}
                label={item}
              />
            </FormGroup>
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
