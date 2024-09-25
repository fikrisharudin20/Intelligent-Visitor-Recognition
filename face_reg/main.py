import cv2
import face_recognition
import os
import re

knownFaceEncodings = []
knownFaceNames = []

path = 'face_reg/dataset/'

folder = os.fsencode(path)
filenames = []


def split_camel_case(s):
    return re.sub('([a-z])([A-Z])', r'\1 \2', s)

def preloadDataset():
    print(folder)
    for file in os.listdir(folder):
        filename = os.fsdecode(file)
        if filename.endswith( ('.jpg', '.png', '.gif','jpeg') ): 
           
            #filenames.append(filename)
            #print(os.path.join(folder,filename))
            img = face_recognition.load_image_file("face_reg\\dataset\\"+filename)
            imgEncoding = face_recognition.face_encodings(img)[0]
            knownFaceEncodings.append(imgEncoding)

            name = os.path.splitext(os.path.basename(filename))[0]
            seperatedString = split_camel_case(name)
            #print(seperatedString.upper())

            knownFaceNames.append(seperatedString)



preloadDataset()
videoCapture = cv2.VideoCapture(0)

while True:
    ret,frame = videoCapture.read()
    faceLocations = face_recognition.face_locations(frame)
    faceEncodings = face_recognition.face_encodings(frame,faceLocations)

    for(top,right,bottom,left), faceEncoding in zip(faceLocations,faceEncodings):
        matches = face_recognition.compare_faces(knownFaceEncodings,faceEncoding,0.48) 
        name = "unknown"

    if True in matches:
        firstMatchIndex = matches.index(True)
        name = knownFaceNames[firstMatchIndex]
        
    cv2.rectangle(frame,(left,top),(right,bottom),(0,0,255),2)
    cv2.putText(frame,name,(left,top-10),cv2.FONT_HERSHEY_SIMPLEX,0.9,(0,0,255),2)

    cv2.imshow("Video",frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

videoCapture.release()
cv2.destroyAllWindows()
