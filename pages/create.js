import { useForm } from "../hooks/useForm";
import Router from "next/router";
import CampaignFactoryInstance from "../instances/CampaignFactory";
import web3 from "../instances/web3";
import { create } from "ipfs-http-client";
import { useState } from "react";
import { Wrapper } from "../components/wrapper";
import { Button } from "../components/button";
import { FullScreenLoader } from "../components/loader";

const client = create("https://ipfs.infura.io:5001/api/v0");

export default function Create() {
  const [ipfsImageUrl, setIpfsImageUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [values, setValue] = useForm({
    title: "",
    goal: undefined,
    recipientAddress: "",
  });

  const getFormErrors = () => {
    const { title, goal, recipientAddress, description } = values;
    const errors = [];

    if (!title || title.length === 0) {
      errors.push("Campaign Title is required");
    }
    if (!goal || goal < 0 || isNaN(goal)) {
      errors.push("Goal Amount is required and must be more than 0");
    }
    if (
      !recipientAddress ||
      recipientAddress.length === 0 ||
      recipientAddress.slice(0, 2) !== "0x"
    ) {
      errors.push("Recipient Address is required and must start with 0x");
    }

    if (!description || description.split(" ").length < 100) {
      errors.push(
        "Campaign Description is required and must be more than 100 words"
      );
    }

    if (!ipfsImageUrl || ipfsImageUrl.length === 0) {
      errors.push("Image is required");
    }

    return errors;
  };

  const handleSubmit = async () => {
    const { goal, recipientAddress } = values;

    const formErrors = getFormErrors();

    setErrors(formErrors);

    if (formErrors.length > 0) {
      return;
    }

    const added = await client.add(
      JSON.stringify({
        ...values,
        ipfsImageUrl,
      })
    );

    const ipfsUrl = `https://ipfs.infura.io/ipfs/${added.path}`;

    const accounts = await web3.eth.getAccounts();

    try {
      setIsLoading(true);
      await CampaignFactoryInstance.methods
        .createCampaign(ipfsUrl, goal, recipientAddress)
        .send({ from: accounts[0] });

      Router.push("/success");
    } catch (e) {
      setIsLoading(false);
      alert(
        "Encountered an error. Press F12 to check the console for details."
      );
    }
  };

  const handleUploadImage = async (e) => {
    const added = await client.add(e.target.files[0]);
    const ipfsUrl = `http://ipfs.infura.io/ipfs/${added.path}`;
    setIpfsImageUrl(ipfsUrl);
  };

  const labelClassName = "block font-medium mb-1";
  const inputClassName = "border border-gray-300 rounded w-full p-2";
  const formItemClassName = "mb-4";

  return (
    <Wrapper>
      {isLoading && <FullScreenLoader />}
      <div className="bg-pink-50 py-24">
        <div className="max-w-screen-lg mx-auto">
          <div className="font-bold text-3xl mb-4">Create a Campaign</div>
          <div className="text-lg italic">
            “One of the biggest defects in life is the inability to ask for
            help.” — Robert Kiyosaki
          </div>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto">
        <div className="w-2/3 shadow-lg bg-white p-6 my-12 rounded mx-auto">
          <div className={formItemClassName}>
            <label className={labelClassName}>Campaign Title</label>
            <input
              className={inputClassName}
              onChange={setValue}
              value={values.title}
              name="title"
            />
          </div>
          <div className={formItemClassName}>
            <label className={labelClassName}>Goal Amount</label>
            <div className="flex items-center">
              <input
                min={0}
                className={inputClassName}
                onChange={setValue}
                value={values.goal}
                name="goal"
                type="number"
              />
              <div className="ml-2 italic">WEI</div>
            </div>
            <div className="text-xs mt-1">
              Enter amount in wei. Need help? Check out this{" "}
              <a
                className="text-blue-600"
                href={`https://eth-converter.com/`}
                target="_blank"
                rel="noreferrer"
              >
                ether converter
              </a>
              !
            </div>
          </div>
          <div className={formItemClassName}>
            <label className={labelClassName}>Recipient Address</label>
            <input
              className={inputClassName}
              onChange={setValue}
              value={values.recipientAddress}
              name="recipientAddress"
            />
            <div className="text-xs mt-1">
              Enter the address of the recipient's wallet. Should begin with 0x.
            </div>
          </div>
          <div className={formItemClassName}>
            <label className={labelClassName}>Campaign Description</label>
            <textarea
              className={inputClassName}
              rows={10}
              name="description"
              value={values.description}
              onChange={setValue}
            />
          </div>
          <div className={formItemClassName}>
            <label className={labelClassName}>Upload Image</label>
            <input
              className={inputClassName}
              onChange={handleUploadImage}
              type="file"
            />
            <div className="mt-4">
              {ipfsImageUrl && <img className="rounded" src={ipfsImageUrl} />}
            </div>
          </div>
          {errors.length > 0 && (
            <div className="pt-4 pb-8">
              <div className="text-red-500 text-sm font-medium mb-2">
                Please fix the following errors:
              </div>
              <ul>
                {errors.map((error) => {
                  return (
                    <li key={error} className="text-red-500 text-sm ml-4">
                      • {error}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <div className="flex justify-end border-t border-gray-300">
            <Button className="mt-8" onClick={handleSubmit} type="primary">
              Create Your Campaign
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
