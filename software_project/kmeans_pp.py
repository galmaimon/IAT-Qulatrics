import numpy as np
import panda as pd
import argparse
class observation:
    def __init__(self,vector,d=float('inf')):
        self.vector=vector
        self.min_d=d
def command_line_arg():
    parser=argparse.ArgumentParser()
    parser.add_argument("K", type=int, help="the number of cluster required")
    parser.add_argument("N", type=int, help="the number of observations in the file")
    #what is the type of d?
    parser.add_argument("d", type=int, help="the dimension of each observation and initial centroids")
    parser.add_argument("MAX_ITER", type=int, help="the maximum number of iterations of the K-means algorithm")
    parser.add_argument("filename", type=str, help="– the path to the file that will contain the N observations of d-dimensional")
    args=parser.parse_args()
    return args

def calculate_d(found_centroid: list(int), observation_list: list(observation)):
    for x in observation_list:
        for m in found_centroid:
            dist = np.linalg.norm(x-m)
            x.min_d=min(x.min_d,dist)

def create_p_vector(observation_list: list(observation),N: int):
    prob_list=[]
    sum_obs=sum(x.min_d for x in observation_list)
    for x in observation_list:
        prob_list.append(x.min_d/sum_obs)
    return prob_list

def k_means_pp(...):
    np.random.seed(0)
    args=command_line_arg()
    K,N,d,MAX_ITER,filename=args.K, args.N, args.d,args.MAX_ITER, args.filename
    observation_file=pd.read_csv(filename)
    observation_file=observation_file.values.tolist()
    observation_list=[]
    for x in observation_file:
        obs=observation(x)
        observation_list.append(obs)
    found_centroid=[]
    #step 1 - choose random M
    first_seed=np.random(N,1);
    if(first_seed==1):
        return 1
    else:
        for j in range(2,K):
            found_centroid.append(observation_list[first_seed])
            calculate_d(found_centroid, observation_list)
            p_vector=create_p_vector(observation_list)
            first_seed=np.random(N,1,p_vector)
        if(len(found_centroid))
