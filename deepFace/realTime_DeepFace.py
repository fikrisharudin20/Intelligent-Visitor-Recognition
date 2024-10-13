from deepface import DeepFace
# ! not working for tf 2.17, need tf 2.12
DeepFace.stream("database", model_name="DeepFace", enable_face_analysis=True)

# OpenFace , DeepFace