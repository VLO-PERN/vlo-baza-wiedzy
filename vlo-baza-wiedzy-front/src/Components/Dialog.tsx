import React, { useState, useRef } from 'react';
import {
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter
} from "@chakra-ui/react";


export const Dialog = (props: any) => {
    const [dialogIsOpen, setDialogIsOpen] = useState(true);
    const onDialogClose = () => {
        setDialogIsOpen(false);
        setTimeout(props.onCancel, 300);
    }
    const confirm = () => {
        setDialogIsOpen(false);
        setTimeout(props.onConfirm, 300);
    }
    const dialogCancelRef: any = useRef();
    return (
       <>
      <AlertDialog
        isOpen={dialogIsOpen}
        leastDestructiveRef={dialogCancelRef}
        onClose={onDialogClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader color="black" fontSize="lg" fontWeight="bold">
              {props.name}
            </AlertDialogHeader>

            <AlertDialogBody color="black">
              Czy aby napewno? Tego ruchu nie cofniesz !
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={dialogCancelRef} onClick={onDialogClose}>
                Anuluj
              </Button>
              <Button colorScheme="red" onClick={confirm} ml={3}>
                Napewno
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </> 
    )
}