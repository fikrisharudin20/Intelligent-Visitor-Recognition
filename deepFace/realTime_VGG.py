from deepface import DeepFace

# The okay one so far

DeepFace.stream("database", model_name="VGG-Face", enable_face_analysis=True, time_threshold=3)

#  OpenFace , DeepFace