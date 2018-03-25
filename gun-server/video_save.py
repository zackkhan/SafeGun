import numpy as np
import cv2

<<<<<<< HEAD
#comment

=======
>>>>>>> d3e4787328748405cff08bd2dcc79e5b72ca713d
fps = 20.0
cap = cv2.VideoCapture(0)

# Define the codec and create VideoWriter object
#fourcc = cv2.cv.CV_FOURCC(*'DIVX')
#out = cv2.VideoWriter('output.avi',fourcc, 20.0, (640,480))
out = cv2.VideoWriter('output.avi', -1, fps, (640,480))
#Second arg should be replaced with fourcc, if you can figure out the default
frame_num = 0
seconds = 5
total_frames=seconds*fps
while(cap.isOpened()):
    ret, frame = cap.read()
    if ret==True:
        frame = cv2.transpose(frame)
        frame = cv2.flip(frame, 1)


        # write the flipped frame
        out.write(frame)
        frame_num+=1
    if frame_num>=total_frames():
        break
"""
        cv2.imshow('frame',frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    else:
        break`
"""
# Release everything if job is finished
cap.release()
out.release()
cv2.destroyAllWindows()
