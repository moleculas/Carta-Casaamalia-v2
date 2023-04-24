import {
  Button,
  Dialog,
  DialogActions,
  DialogContent
} from '@mui/material';

const Lightbox = ({ isOpen, onClose, image }) => {

  return (
    <Dialog
      maxWidth={'md'}
      open={isOpen}
      onClose={onClose}
    >

      <DialogContent>
        <img
          src={image}
          alt=""
          style={{ width: "100%", maxHeight: "80vh" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus color="secondary">
          Tancar
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default Lightbox;