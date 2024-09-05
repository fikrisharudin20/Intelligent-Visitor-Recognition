import face_recognition
import cv2
import numpy as np

# Use 0 for default webcam
video_capture = cv2.VideoCapture(1)

# Sample Loading
obama_image = face_recognition.load_image_file("obama.jpg")
obama_face_encoding = face_recognition.face_encodings(obama_image)[0]

biden_image = face_recognition.load_image_file("biden.jpg")
biden_face_encoding = face_recognition.face_encodings(biden_image)[0]

fikri_image = face_recognition.load_image_file("fikri.jpg")
fikri_face_encoding = face_recognition.face_encodings(fikri_image)[0]



# Array of known faces
known_face_encodings = [
    obama_face_encoding,
    biden_face_encoding,
    fikri_face_encoding
    
]
known_face_names = [
    "Barack Obama",
    "Joe Biden",
    "Fikri Sharudin"
]

face_locations = []
face_encodings = []
face_names = []
process_this_frame = True

while True:
    
    ret, frame = video_capture.read()
    
    if process_this_frame:
        small_frame = cv2.resize(frame, (0, 0), fx=1, fy=1)

        rgb_small_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)

        #Find face
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        face_names = []
        for face_encoding in face_encodings:
            #If face is in the known faces
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            name = "Unknown"

            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = known_face_names[best_match_index]

            face_names.append(name)

    # Result Display
    for (top, right, bottom, left), name in zip(face_locations, face_names):

        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

        cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)

    cv2.imshow('Video', frame)

    # Q to quit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

video_capture.release()
cv2.destroyAllWindows()