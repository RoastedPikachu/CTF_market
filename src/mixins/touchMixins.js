import { ref } from 'vue';

export default function() {

    const firstTouchCoordinates = ref(0);
    const lastTouchCoordinates = ref(0);

    const changePhotoByTouch = (event, getNext, getPrevious) => {
        lastTouchCoordinates.value = event.changedTouches[0].pageX;

        if(firstTouchCoordinates.value > lastTouchCoordinates.value) {
            getPrevious();
        } else if(firstTouchCoordinates.value < lastTouchCoordinates.value) {
            getNext();
        }
    }

    return {
        firstTouchCoordinates,
        lastTouchCoordinates,
        changePhotoByTouch
    }
}