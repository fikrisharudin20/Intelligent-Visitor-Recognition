from deepface import DeepFace

# ! Facenet
DeepFace.stream("database", model_name="Facenet", enable_face_analysis=True)

# ! Facenet512 
# DeepFace.stream("database", model_name="Facenet512", enable_face_analysis=False)