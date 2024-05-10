"""
MIT BWSI Autonomous RACECAR
MIT License
bwsix RC101 - Fall 2023

File Name: template.py << [Modify with your own file name!]

Title: [PLACEHOLDER] << [Modify with your own title]

Author: [PLACEHOLDER] << [Write your name or team name here]

Purpose: [PLACEHOLDER] << [Write the purpose of the script here]

Expected Outcome: [PLACEHOLDER] << [Write what you expect will happen when you run
the script.]
"""

########################################################################################
# Imports
########################################################################################

import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt
import ipywidgets as widgets
from nptyping import NDArray
from typing import Any, Tuple, List, Optional
import sys

# If this file is nested inside a folder in the labs folder, the relative path should
# be [1, ../../library] instead.
sys.path.insert(1, '../../library')
import racecar_core
import racecar_utils as rc_utils

########################################################################################
# Global variables
########################################################################################

rc = racecar_core.create_racecar()



########################################################################################
# Functions
def draw_contour(image: NDArray, contour: NDArray, color: Tuple[int, int, int] = (0, 255, 0)) -> None:
    cv.drawContours(image, [contour], 0, color, 3)

def draw_circle(image: NDArray[(Any, Any, 3), np.uint8], center: Tuple[int, int], color: Tuple[int, int, int] = (0, 255, 255), radius: int = 6) -> None:
    cv.circle(image, (center[1], center[0]), radius, color, -1)

def get_mask(image: NDArray[(Any, Any, 3), np.uint8], hsv_lower: Tuple[int, int, int], hsv_upper: Tuple[int, int, int]) -> NDArray[Any, Any]:
    hsv_lower = np.array(hsv_lower)
    hsv_upper = np.array(hsv_upper)
    image_hsv = cv.cvtColor(image, cv.COLOR_BGR2HSV)
    extracted_image = cv.inRange(image_hsv, hsv_lower, hsv_upper)
    return extracted_image

def find_contours(mask: NDArray) -> List[NDArray]:
    return cv.findContours(mask, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE)[0]

def get_largest_contour(contours: List[NDArray], min_area: int = 30) -> Optional[NDArray]:
    max_area = 0
    largest_contour = None
    for contour in contours:
        tmp_area = cv.contourArea(contour)
        if tmp_area > max_area:
            max_area = tmp_area
            largest_contour = contour
    if max_area < min_area:
        return None
    return largest_contour

def get_contour_center(contour: NDArray) -> Optional[Tuple[int, int]]:
    M = cv.moments(contour)
    if M["m00"] <= 0:
        return None
    center_row = round(M["m01"] / M["m00"])
    center_column = round(M["m10"] / M["m00"])
    return (center_row, center_column)

def process_image(image: NDArray) -> Tuple[NDArray, Optional[int]]:
    hsv_lower = (0, 50, 50)
    hsv_upper = (20, 255, 255)
    mask = get_mask(image, hsv_lower, hsv_upper)
    contours = find_contours(mask)
    largest_contour = get_largest_contour(contours)
    center_x = None
    if largest_contour is not None:
        center = get_contour_center(largest_contour)
        draw_contour(image, largest_contour)
        draw_circle(image, center)
        center_x = center[1]  # x座標を取得
    return image, center_x
#################################################################1#######################

# [FUNCTION] The start function is run once every time the start button is pressed
def start():
    global speed
    global angle
    global nice_dis
    speed = -0.1
    angle = 0
    global mode
    global mode2
    global nice_dis
    mode = "..."
    mode2 =""
# [FUNCTION] After start() is run, this function is run once every frame (ideally at
# 60 frames per second or slower depending on processing speed) until the back button
# is pressed
def update():
    global speed, angle, mode, mode2, nice_dis  # グローバル変数を宣言する
    speed = -0.1
    angle = 0
    mode = "..."
    mode2 = ""
    nice_dis = 50

    image = rc.camera.get_color_image_async()
    processed_image, center_x = process_image(image)
    
    if center_x is None:  
        mode = "..."
        scan = rc.lidar.get_samples()
        right45 = rc_utils.get_lidar_average_distance(scan, 45)
        front = rc_utils.get_lidar_average_distance(scan,0)
        right = rc_utils.get_lidar_average_distance(scan, 120)
        left = rc_utils.get_lidar_average_distance(scan, 600)
        left45 = rc_utils.get_lidar_average_distance(scan, 675)
        R = rc_utils.get_lidar_average_distance(scan,120)
        L = rc_utils.get_lidar_average_distance(scan, 600)
        hole = R+L
        nice_dis = 40
        if right45 > nice_dis :
            angle = (right45 - nice_dis)/30
            mode2 = "migi"
        elif right45 < nice_dis :
            angle = (right45 - nice_dis)/30
            mode2= "hidari"
        else:
            angle = 0
            mode2 = "none"

        if front/3.5 < right:
            angle = -1
            mode2 = "hidarimagaru"
            mode3="BAD"
        else:
            mode3 = "good"

        if angle > 1:
            angle = 1
        elif angle < -1:
            angle = -1

    elif center_x is not None:
        print("Center X coordinate:", center_x)

        speed = -0.1
        angle = 0.0

        scan = rc.lidar.get_samples()
        front = scan[0]

        if center_x >= 240 and center_x <= 400:
            speed = -0.1
            angle = -1

    rc.drive.set_speed_angle(speed, angle)



# [FUNCTION] update_slow() is similar to update() but is called once per second by
# default. It is especially useful for printing debug messages, since printing a
# message every frame in update is computationally expensive and creates clutter
def update_slow():
    pass # Remove 'pass and write your source code for the update_slow() function here


########################################################################################
# DO NOT MODIFY: Register start and update and begin execution
########################################################################################

if __name__ == "__main__":
    rc.set_start_update(start, update, update_slow)
    rc.go()
