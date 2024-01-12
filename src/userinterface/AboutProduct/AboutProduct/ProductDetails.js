
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ProductDetails() {

return(
    <div>
               
             
                            {/* <Accordion> */}
                                {/* <AccordionSummary
                                    // expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                > */}
                                    <Typography style={{ fontFamily: 'Roboto', fontSize: '20px', fontWeight: 550,lineHeight:3,letterSpacing:0.5 }}>Product Details</Typography>
                                {/* </AccordionSummary> */}
                                {/* <AccordionDetails> */}
                                                    <Typography>
                                                    Lay's is a brand of potato chips with different flavors, as well as the name of the company that founded the chip brand in the United States. The brand is also referred to as Frito-Lay because both Lay's and Fritos are brands sold by the Frito-Lay company, which has been a wholly owned subsidiary of PepsiCo since 1965.
                                                    </Typography>
                                                {/* </AccordionDetails> */}
                                    {/* </Accordion> */}
                    
    </div>
)



}