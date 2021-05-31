import json
pcm_file=open("the_des_alizes.wav","rb")
pcm_file.seek(0)
pf_seg=b''
while pf_seg!=b'data':
    pf_seg=pcm_file.read(4)
lsmp=[]
rsmp=[]
smp_ptr=0
while True:
    try:
        l=ord(pcm_file.read(1))|(ord(pcm_file.read(1))<<8)
        r=ord(pcm_file.read(1))|(ord(pcm_file.read(1))<<8)
        lsmp.append(l); rsmp.append(r)
        smp_ptr+=1
        if smp_ptr%441000==0:
            print("\rreading sample count: "+str(smp_ptr),end='')
    except:
        break

print("\rreading sample count: "+str(smp_ptr),end='')
print()
ldata=[]
rdata=[]
dat_ptr=0
for i in range(len(lsmp)):
    lsym=(lsmp[i]&0x8000)>>15
    rsym=(rsmp[i]&0x8000)>>15
    if lsym==1: 
        l=0-((lsmp[i]^0xffff)+1)
    else:
        l=lsmp[i]
    if rsym==1: 
        r=0-((rsmp[i]^0xffff)+1)
    else:
        r=rsmp[i]
    ldata.append(l)
    rdata.append(r)
    dat_ptr+=1
    if dat_ptr%441000==0:
        print("\rconverting sample data count: "+str(dat_ptr),end='')

print("\rconverting sample data count: "+str(dat_ptr),end='')
print()
print("outputing to file")
pcm_json=json.dumps({"l":ldata,"r":rdata})
pcm_json_file=open("the_des_alizes_data_pcm.js","w")
pcm_json_file.write("var pcm_data="+pcm_json)
pcm_json_file.close()
print("ok")